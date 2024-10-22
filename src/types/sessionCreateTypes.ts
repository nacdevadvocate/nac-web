export interface FormValues {
    phoneNumber?: string;
    networkAccessIdentifier?: string;
    profileSelect: string;
    duration: number;
    devicePublicIp?: string;
    devicePrivateIp?: string;
    devicePublicPort?: number;
    deviceIpv6?: string;
    appServerIpv4?: string;
    appServerIpv6?: string;
    notificationUrl: string;
    notificationAuthToken?: string;
}