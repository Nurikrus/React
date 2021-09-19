import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, toggleShowName } from "../../store/profile/action";
import { ThemeContext } from "../../utils/ThemeContext";
import { Button } from "../Button";

export const Profile = () => {
    const [value, setValue] = useState('');
    const theme = useContext(ThemeContext);
    const showName = useSelector((state) => state.profile.showName);
    const name = useSelector((state) => state.profile.name);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleShowName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changeName(value));
        setValue('');
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
                <Button>{() => (<><span>Add Name</span></>)}</Button>
            </form>
            {showName && <div>Name is {name}</div>}
            <h2 className='userProfile' style={{ color: theme.theme === 'light' ? 'blue' : 'blueviolet' }}>User Profile</h2>
        </div>
    );
};