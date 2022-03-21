import React from 'react';
import { SceneRendererProps, NavigationState } from 'react-native-tab-view';
import memoize from 'react-native-tab-view/src/memoize';
import Animated, { Easing as OldEasing, EasingNode, Extrapolate, multiply, sub } from 'react-native-reanimated';
// @ts-ignore
import { GetTabWidth } from 'react-native-tab-view/src/TabBarIndicator';
import { I18nManager, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Box } from 'native-base';

type Route = {
    key: string;
    icon: any;
};

type State = NavigationState<Route>;

interface Interface extends SceneRendererProps {
    navigationState: State;
    getTabWidth: (i: number) => number;
}

const Easing = EasingNode || OldEasing;

export type GetTabWidth = (index: number) => number;

export type Props<T extends Route> = SceneRendererProps & {
    navigationState: NavigationState<T>;
    width: string | number;
    style?: StyleProp<ViewStyle>;
    getTabWidth: GetTabWidth;
};

// @ts-ignore
const interpolate = Animated.interpolateNode || Animated.interpolate;

export default class CustomeTab<T extends Route> extends React.Component<Props<T>> {
    componentDidMount() {
        this.fadeInIndicator();
    }

    componentDidUpdate() {
        this.fadeInIndicator();
    }

    private fadeInIndicator = () => {
        const { navigationState, layout, width, getTabWidth } = this.props;

        if (
            !this.isIndicatorShown &&
            width === 'auto' &&
            layout.width &&
            // We should fade-in the indicator when we have widths for all the tab items
            navigationState.routes.every((_, i) => getTabWidth(i))
        ) {
            this.isIndicatorShown = true;

            Animated.timing(this.opacity, {
                duration: 150,
                toValue: 1,
                easing: Easing.in(Easing.linear),
            }).start();
        }
    };

    private isIndicatorShown = false;

    private opacity = new Animated.Value(this.props.width === 'auto' ? 0 : 1);

    private getTranslateX = memoize((position: Animated.Node<number>, routes: Route[], getTabWidth: GetTabWidth) => {
        const inputRange = routes.map((_, i) => i);

        // every index contains widths at all previous indices
        const outputRange = routes.reduce<number[]>((acc, _, i) => {
            if (i === 0) return [0];
            return [...acc, acc[i - 1] + getTabWidth(i - 1)];
        }, []);

        const translateX = interpolate(position, {
            inputRange,
            outputRange,
            extrapolate: Extrapolate.CLAMP,
        });

        return multiply(translateX, I18nManager.isRTL ? -1 : 1);
    });

    private getWidth = memoize((position: Animated.Node<number>, routes: Route[], getTabWidth: GetTabWidth) => {
        const inputRange = routes.map((_, i) => i);
        const outputRange = inputRange.map(getTabWidth);

        return interpolate(position, {
            inputRange,
            outputRange,
            extrapolate: Extrapolate.CLAMP,
        });
    });

    render() {
        const { position, navigationState, getTabWidth, width, style, layout } = this.props;
        const { routes } = navigationState;

        const translateX = routes.length > 1 ? this.getTranslateX(position, routes, getTabWidth) : 0;

        const indicatorWidth =
            width === 'auto' ? (routes.length > 1 ? this.getWidth(position, routes, getTabWidth) : getTabWidth(0)) : width;
        return (
            <Animated.View
                style={[
                    styles.indicator,
                    // If layout is not available, use `left` property for positioning the indicator
                    // This avoids rendering delay until we are able to calculate translateX
                    { width: indicatorWidth },
                    layout.width ? { transform: [{ translateX }] as any } : { left: `${(100 / routes.length) * navigationState.index}%` },
                    width === 'auto' ? { opacity: this.opacity } : null,
                    style,
                ]}
            >
                <Box h={'34px'} w={'100%'} bg={'white.100'} borderRadius={100}></Box>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        height: 38,
        borderRadius: 100,
        backgroundColor: '#1C6EBA',
        padding: 2,
        shadowColor: '#1C6EBA',
        shadowOffset: { height: 0, width: 0 },
        alignItems: 'center',
        justifyContent: 'center',
    },
});
