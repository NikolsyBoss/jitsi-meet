package one.effko.meet.sdk;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.WritableNativeMap;

import one.effko.meet.sdk.log.JitsiMeetLogger;

import java.util.HashMap;

/**
 * Wraps the name and extra data for events that were broadcasted locally.
 */
public class BroadcastAction {
    private static final String TAG = BroadcastAction.class.getSimpleName();

    private final Type type;
    private final HashMap<String, Object> data;

    public BroadcastAction(Intent intent) {
        this.type = Type.buildTypeFromAction(intent.getAction());
        this.data = buildDataFromBundle(intent.getExtras());
    }

    public Type getType() {
        return this.type;
    }

    public HashMap<String, Object> getData() {
        return this.data;
    }

    public WritableNativeMap getDataAsWritableNativeMap() {
        WritableNativeMap nativeMap = new WritableNativeMap();

        for (String key : this.data.keySet()) {
            try {
                if (this.data.get(key) instanceof Boolean) {
                    nativeMap.putBoolean(key, (Boolean) this.data.get(key));
                } else if (this.data.get(key) instanceof Integer) {
                    nativeMap.putInt(key, (Integer) this.data.get(key));
                } else if (this.data.get(key) instanceof Double) {
                    nativeMap.putDouble(key, (Double) this.data.get(key));
                } else if (this.data.get(key) instanceof String) {
                    nativeMap.putString(key, (String) this.data.get(key));
                } else {
                    throw new Exception("Unsupported extra data type");
                }
            } catch (Exception e) {
                JitsiMeetLogger.w(TAG + " invalid extra data in event", e);
            }
        }

        return nativeMap;
    }

    private static HashMap<String, Object> buildDataFromBundle(Bundle bundle) {
        HashMap<String, Object> map = new HashMap<>();

        if (bundle != null) {
            for (String key : bundle.keySet()) {
                map.put(key, bundle.get(key));
            }
        }

        return map;
    }

    enum Type {
        SET_AUDIO_MUTED("one.effko.meet.SET_AUDIO_MUTED"),
        HANG_UP("one.effko.meet.HANG_UP"),
        SEND_ENDPOINT_TEXT_MESSAGE("one.effko.meet.SEND_ENDPOINT_TEXT_MESSAGE"),
        TOGGLE_SCREEN_SHARE("one.effko.meet.TOGGLE_SCREEN_SHARE"),
        RETRIEVE_PARTICIPANTS_INFO("one.effko.meet.RETRIEVE_PARTICIPANTS_INFO"),
        OPEN_CHAT("one.effko.meet.OPEN_CHAT"),
        CLOSE_CHAT("one.effko.meet.CLOSE_CHAT"),
        SEND_CHAT_MESSAGE("one.effko.meet.SEND_CHAT_MESSAGE"),
        SET_VIDEO_MUTED("one.effko.meet.SET_VIDEO_MUTED");

        private final String action;

        Type(String action) {
            this.action = action;
        }

        public String getAction() {
            return action;
        }

        private static Type buildTypeFromAction(String action) {
            for (Type type : Type.values()) {
                if (type.action.equalsIgnoreCase(action)) {
                    return type;
                }
            }
            return null;
        }
    }
}
