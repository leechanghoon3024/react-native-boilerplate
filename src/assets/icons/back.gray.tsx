import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface Props {
    color?: string;
}

const BackGray = ({ color }: Props) => {
    return (
        <Svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <Path
                d="M1.18474 14.6918C0.764895 15.0934 0.764895 15.7445 1.18474 16.1461C1.60459 16.5477 2.28529 16.5477 2.70514 16.1461L9.49351 9.65284C10.0686 9.10279 10.0686 8.21096 9.49351 7.6609L2.70514 1.16768C2.28529 0.766086 1.60459 0.766086 1.18474 1.16768C0.764893 1.56927 0.764894 2.22038 1.18474 2.62197L7.49396 8.65687L1.18474 14.6918Z"
                fill={color ?? '#A6A6A6'}
            />
        </Svg>
    );
};

export default BackGray;
