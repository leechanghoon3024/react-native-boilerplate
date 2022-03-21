import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface Props {
    color?: string;
}

const ArrowUp = ({ color }: Props) => {
    return (
        <Svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <Path
                d="M10.4482 5.72363L5.72412 0.999512L1 5.72363"
                stroke={color ?? '#1C6EBA'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default ArrowUp;
