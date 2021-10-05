import { onValue, ref, set } from "@firebase/database";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, toggleShowName } from "../../store/profile/action";
import { selectName, selectShowName } from "../../store/profile/selectors";
import { ThemeContext } from "../../utils/ThemeContext";
import { Button } from "../Button";
import { db } from "../Firebase";

export const Profile = ({ onLoguot }) => {
    const [value, setValue] = useState('');
    const theme = useContext(ThemeContext);
    const showName = useSelector(selectShowName);
    const name = useSelector(selectName);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleShowName);
    };

    const handleLoguot = () => {
        onLoguot();
    };

    useEffect(() => {
        const userDbRef = ref(db, "user");
        onValue(userDbRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(changeName(data?.username || ''));
        });
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue('');
        set(ref(db, "user"), {
            username: value,
        });
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <button onClick={theme.changeTheme}>Use theme</button>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showName}
                            onChange={handleClick}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label="Current Name"
                />
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={value} onChange={handleChange} />
                <Button children='Add Name' />
            </form>
            {showName && <div>Name is {name}</div>}
            <h2 className='userProfile' style={{ color: theme.theme === 'light' ? 'blue' : 'blueviolet' }}>User Profile</h2>
            <button onClick={handleLoguot}>Logout</button>
        </div>
    );
};