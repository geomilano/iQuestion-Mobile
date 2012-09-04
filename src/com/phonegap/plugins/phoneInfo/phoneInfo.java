package com.phonegap.plugins.phoneInfo;

import org.json.JSONArray;

import android.content.Context;
import android.telephony.TelephonyManager;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;


public class phoneInfo extends Plugin {

    @Override
    public PluginResult execute(String action, JSONArray args, String callbackId) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";
        TelephonyManager telephonyManager = (TelephonyManager)this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
        if (action.equals("getmsisdn")) {            
            result = telephonyManager.getLine1Number();
        }
        else if(action.equals("getcountry")){        	
            result = telephonyManager.getNetworkCountryIso();
        }
        else if(action.equals("getSimSerialNumber")){        	
            result = telephonyManager.getSimSerialNumber();
        }
        else if(action.equals("getNetworkOperatorName")){        	
            result = telephonyManager.getNetworkOperatorName();
        }
        else if(action.equals("getSubscriberId")){        	
            result = telephonyManager.getSubscriberId();
        }
        else if(action.equals("getDeviceId")){        	
            result = telephonyManager.getDeviceId();
        }
        else {
            status = PluginResult.Status.INVALID_ACTION;
        }
        return new PluginResult(status, result);
    }

}
