import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowName } from "../../store/profile/action";
import { ThemeContext } from "../../utils/ThemeContext";

export const Profile = () => {
    const theme = useContext(ThemeContext)
    const showName = useSelector((state) => state.showName);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleShowName);
    };

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

            {showName && <div>Name is current</div>}
            <h2 className='userProfile' style={{ color: theme.theme === 'light' ? 'blue' : 'blueviolet' }}>User Profile</h2>
        </div>
    );
};