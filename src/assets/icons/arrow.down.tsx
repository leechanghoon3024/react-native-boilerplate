import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
interface Props {
    color?: string;
}
const ArrowDown = ({ color }: Props) => {
    return (
        <Svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <Path
                d="M1 1L5.72412 5.72412L10.4482 1"
                stroke={color ?? '#1C6EBA'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default ArrowDown;
