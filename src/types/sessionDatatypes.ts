export interface Device {
    phoneNumber: string | null;
    networkAccessIdentifier: string;
    ipv4Address: {
        publicAddress: string;
        privateAddress: string;
        publicPort: number;
    };
    ipv6Address: string | null;
}

export interface ApplicationServer {
    ipv4Address: string;
    ipv6Address: string | null;
}

export interface Webhook {
    notificationUrl: string;
    notificationAuthToken: string | null;
}

export interface SessionData {
    qosProfile: string;
    device: Device;
    devicePorts: string | null;
    applicationServer: ApplicationServer;
    applicationServerPorts: string | null;
    webhook: Webhook;
    notificationUrl: string | null;
    notificationAuthToken: string | null;
    sessionId: string;
    qosStatus: string;
    startedAt: string;
    expiresAt: string;
    duration: number;
}
