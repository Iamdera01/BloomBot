/// <reference types="node" />
/// <reference types="ws" />
import { LegacySocketConfig } from '../Types';
declare const makeLegacySocket: (config: Partial<LegacySocketConfig>) => {
    groupMetadata: (jid: string, minimal: boolean) => Promise<import("../Types").GroupMetadata>;
    groupCreate: (title: string, participants: string[]) => Promise<import("../Types").GroupMetadata>;
    groupLeave: (id: string) => Promise<void>;
    groupUpdateSubject: (id: string, title: string) => Promise<void>;
    groupUpdateDescription: (jid: string, description: string) => Promise<{
        status: number;
    }>;
    groupParticipantsUpdate: (id: string, participants: string[], action: import("../Types").ParticipantAction) => Promise<string[]>;
    getBroadcastListInfo: (jid: string) => Promise<import("../Types").GroupMetadata>;
    groupInviteCode: (jid: string) => Promise<string>;
    relayMessage: (message: import("../Types").WAProto.IWebMessageInfo, { waitForAck }?: {
        waitForAck: boolean;
    }) => Promise<void>;
    generateUrlInfo: (text: string) => Promise<import("../Types").WAUrlInfo>;
    messageInfo: (jid: string, messageID: string) => Promise<import("../Types").WAProto.IUserReceipt[]>;
    downloadMediaMessage: (message: import("../Types").WAProto.IWebMessageInfo, type?: "stream" | "buffer") => Promise<Buffer | import("stream").Readable>;
    updateMediaMessage: (message: import("../Types").WAProto.IWebMessageInfo) => Promise<import("..").BinaryNode>;
    fetchMessagesFromWA: (jid: string, count: number, cursor?: import("../Types").WAMessageCursor) => Promise<import("../Types").WAProto.WebMessageInfo[]>;
    loadMessageFromWA: (jid: string, id: string) => Promise<import("../Types").WAProto.WebMessageInfo>;
    searchMessages: (txt: string, inJid: string, count: number, page: number) => Promise<{
        last: boolean;
        messages: import("../Types").WAProto.WebMessageInfo[];
    }>;
    sendMessage: (jid: string, content: import("../Types").AnyMessageContent, options?: import("../Types").MiscMessageGenerationOptions & {
        waitForAck?: boolean;
    }) => Promise<import("../Types").WAProto.WebMessageInfo>;
    sendChatsQuery: (epoch: number) => Promise<string>;
    profilePictureUrl: (jid: string, timeoutMs?: number) => Promise<string>;
    chatRead: (fromMessage: import("../Types").WAProto.IMessageKey, count: number) => Promise<void>;
    chatModify: (modification: import("../Types").ChatModification, jid: string, chatInfo: Pick<import("../Types").Chat, "mute" | "pin">, timestampNow?: number) => Promise<void | {
        status: number;
    }>;
    onWhatsApp: (str: string) => Promise<{
        exists: boolean;
        jid: string;
        isBusiness: boolean;
    }>;
    sendPresenceUpdate: (type: import("../Types").WAPresence, jid: string) => Promise<string>;
    presenceSubscribe: (jid: string) => Promise<string>;
    getStatus: (jid: string) => Promise<{
        status: string;
    }>;
    setStatus: (status: string) => Promise<{
        status: number;
    }>;
    updateBusinessProfile: (profile: import("../Types").WABusinessProfile) => Promise<void>;
    updateProfileName: (name: string) => Promise<{
        status: number;
        pushname: string;
    }>;
    updateProfilePicture(jid: string, img: Buffer): Promise<void>;
    blockUser: (jid: string, type?: "add" | "remove") => Promise<void>;
    getBusinessProfile: (jid: string) => Promise<import("../Types").WABusinessProfile>;
    state: import("../Types").ConnectionState;
    authInfo: import("../Types").LegacyAuthenticationCreds;
    ev: import("../Types").LegacyBaileysEventEmitter;
    canLogin: () => boolean;
    logout: () => Promise<void>;
    waitForConnectionUpdate: (check: (u: Partial<import("../Types").ConnectionState>) => boolean, timeoutMs?: number) => Promise<void>;
    type: "legacy";
    ws: import("ws");
    sendAdminTest: () => Promise<string>;
    updateKeys: (info: {
        encKey: Buffer;
        macKey: Buffer;
    }) => {
        encKey: Buffer;
        macKey: Buffer;
    };
    waitForSocketOpen: () => Promise<void>;
    sendNode: ({ json, binaryTag, tag, longTag }: import("../Types").SocketSendMessageOptions) => Promise<string>;
    generateMessageTag: (longTag?: boolean) => string;
    waitForMessage: (tag: string, requiresPhoneConnection: boolean, timeoutMs?: number) => {
        promise: Promise<any>;
        cancelToken: () => void;
    };
    query: ({ json, timeoutMs, expect200, tag, longTag, binaryTag, requiresPhoneConnection }: import("../Types").SocketQueryOptions) => Promise<any>;
    setQuery: (nodes: import("..").BinaryNode[], binaryTag?: import("../Types").WATag, tag?: string) => Promise<{
        status: number;
    }>;
    currentEpoch: () => number;
    end: (error: Error) => void;
};
export default makeLegacySocket;
