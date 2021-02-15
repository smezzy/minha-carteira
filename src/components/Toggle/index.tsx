import React from 'react';
import { Container, ToggleLabel, ToggleSwitch } from './styles';


interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

export const Toggle: React.FC<IToggleProps> = ( { labelLeft, labelRight, checked, onChange })  => (
    <Container>
        <ToggleLabel>{labelLeft}</ToggleLabel>
        <ToggleSwitch 
            checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}    
            onChange={onChange}
        />
        <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>
)

export default Toggle;