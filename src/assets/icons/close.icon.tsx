import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const CloseIcon = () => {
    return (
        <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
            <Path
                d="M19.0151 2.43329L19.0152 2.43324C19.4834 1.9815 19.4834 1.24555 19.0151 0.793959C18.552 0.347326 17.8047 0.347326 17.3415 0.793959L0.985 16.5664C0.516793 17.0179 0.516719 17.7537 0.984778 18.2053C1.217 18.4307 1.52085 18.5409 1.82136 18.5409C2.12274 18.5409 2.42577 18.4289 2.6583 18.2061L2.65886 18.2055L19.0151 2.43329Z"
                fill="black"
                stroke="black"
                stroke-width="0.5"
            />
            <Path
                d="M0.984944 2.43324L0.985007 2.4333L17.3421 18.205C17.3422 18.2051 17.3422 18.2051 17.3423 18.2052C17.5747 18.4306 17.8783 18.5409 18.179 18.5409C18.4795 18.5409 18.7822 18.4288 19.0146 18.2061L19.0151 18.2055C19.4834 17.754 19.4834 17.018 19.0151 16.5664L2.65886 0.79396L2.6588 0.793905C2.19545 0.347373 1.4482 0.347297 0.985 0.793959C0.516687 1.24555 0.516769 1.9815 0.984944 2.43324Z"
                fill="black"
                stroke="black"
                stroke-width="0.5"
            />
        </Svg>
    );
};

export default CloseIcon;