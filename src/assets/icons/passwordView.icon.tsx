import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
interface Props {
    color: string;
}
const PasswordViewIcon = ({ color }: Props) => {
    return (
        <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
            <G clip-path="url(#clip0_126_2821)">
                <Path
                    d="M13.6758 10.3499C11.7199 10.3499 10.1304 11.9394 10.1304 13.8953C10.1304 15.8513 11.7199 17.4408 13.6758 17.4408C15.6317 17.4408 17.2213 15.8513 17.2213 13.8953C17.2213 11.9394 15.6317 10.3499 13.6758 10.3499Z"
                    fill={color}
                />
                <Path
                    d="M13.6758 5.03171C7.7667 5.03171 2.72035 8.70713 0.675781 13.8954C2.72035 19.0835 7.7667 22.759 13.6758 22.759C19.5908 22.759 24.6313 19.0835 26.6758 13.8954C24.6313 8.70713 19.5908 5.03171 13.6758 5.03171ZM13.6758 19.8044C10.414 19.8044 7.7667 17.1571 7.7667 13.8953C7.7667 10.6335 10.414 7.98624 13.6758 7.98624C16.9376 7.98624 19.5849 10.6335 19.5849 13.8954C19.5849 17.1572 16.9376 19.8044 13.6758 19.8044Z"
                    fill={color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_126_2821">
                    <Rect width="26" height="26" fill="white" transform="translate(0.675781 0.895325)" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default PasswordViewIcon;
