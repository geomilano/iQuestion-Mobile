package org.completemr.hellogeo;

import org.apache.cordova.DroidGap;
import android.content.Context;
import android.telephony.TelephonyManager;
import android.webkit.WebView;

public class CustomeNativeAccess { 
    private WebView mAppView;
    private DroidGap mGap;
    public CustomeNativeAccess(DroidGap gap, WebView view)
    {
        mAppView = view;
        mGap = gap;
    }   
    public String getImeiNumber(){
     TelephonyManager tm = (TelephonyManager) mGap.getSystemService(Context.TELEPHONY_SERVICE);
        String imeiId = tm.getDeviceId();      
        return imeiId;
    }
    public String getMyPhoneNumber(){
  
        TelephonyManager tm = (TelephonyManager) mGap.getSystemService(Context.TELEPHONY_SERVICE);
        String number = tm.getLine1Number();
        return number;
    }
    
}