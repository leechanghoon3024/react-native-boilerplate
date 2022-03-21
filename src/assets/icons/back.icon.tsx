import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface Props {
    color?: string;
}

const BackIcon = ({ color }: Props) => {
    return (
        <Svg width="13" height="23" viewBox="0 0 13 23" fill="none">
            <Path
                d="M12.2551 2.57338C12.8438 1.98469 12.8438 1.03022 12.2551 0.441523C11.6664 -0.147174 10.7119 -0.147174 10.1232 0.441523L0.604753 9.96C-0.201585 10.7663 -0.201584 12.0737 0.604754 12.88L10.1232 22.3985C10.7119 22.9872 11.6664 22.9872 12.2551 22.3985C12.8438 21.8098 12.8438 20.8553 12.2551 20.2666L3.40847 11.42L12.2551 2.57338Z"
                fill={color ?? 'black'}
            />
        </Svg>
    );
};

export default BackIcon;
