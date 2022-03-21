import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfilePage from '../containers/auth/profile.page';
import DriverCollection from '../containers/driver/collection/driver.collection';
import ScanFind from '../containers/depot/scan/scan.find';
import PasswordChange from '../containers/auth/password.change';
import ReportCollection from '../containers/user/collections/report.collection';

export type UserParamList = {
    HomeScreen: undefined;
    DetailScreen: { idx: number };
    CharityDetail: { idx: number };
    ReportCollection: { idx: number };
};

export interface UserStackParamList<RouterName extends keyof UserParamList> {
    navigation: NativeStackNavigationProp<UserParamList, RouterName>;
    route: RouteProp<UserParamList, RouterName>;
}

export type DriverParamList = {
    HomeScreen: undefined;
    WaitList: { title: string };
    DrivingList: { title: string };
    CompleteList: { title: string };
    DriverView: { idx: number };
    Qrcode: { idx: number; customer: string; address: string };
    ProfileDriver: undefined;
    PickList: undefined;
    DriverCollection: { idx: number };
    HistoryScreen: undefined;
};

export interface DriverStackParamList<RouterName extends keyof DriverParamList> {
    navigation: NativeStackNavigationProp<DriverParamList, RouterName>;
    route: RouteProp<DriverParamList, RouterName>;
}

export type DepotParamList = {
    HomeScreen: undefined;
    BagScanScreen: { code: string; idx: number };
    QrScanScreen: undefined;
    ScanFind: undefined;
    ScanDetail: { code: string };
    CalculateScreen: { code: string };
    DepotList: undefined;
    DepotDetail: { code: string };
    Setting: undefined;
    CalculateDone: {
        glass: number;
        clear: number;
        alu: number;
        color: number;
        hdpe: number;
        lpb: number;
        steel: number;
        other: number;
        ineli: number;
        code: string;
    };
};

export interface DepotStackParamList<RouterName extends keyof DepotParamList> {
    navigation: StackNavigationProp<DepotParamList, RouterName>;
    route: RouteProp<DepotParamList, RouterName>;
}

export type AuthParamList = {
    LoginSelect: undefined;
    SingUpScreen: undefined;
    SingInScreen: undefined;
    LogoScreen: undefined;
    EmailValidate: { email: string; code: string; password: string; accountType: string };
    EmailComplete: undefined;
    ProfilePage: undefined;
    PassWordFind: undefined;
    PasswordValidate: { email: string; code: string };
    PasswordChange: { email: string };
};

export interface AuthStackParamList<RouteName extends keyof AuthParamList> {
    navigation: StackNavigationProp<AuthParamList, RouteName>;
    route: RouteProp<AuthParamList, RouteName>;
}
