package org.completemr.hellogeo;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

public class HelloGeoActivity extends DroidGap {
    /** Called when the activity is first created. */
	private CustomeNativeAccess cna;
	@Override
   
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();    
        cna = new CustomeNativeAccess(this, super.appView);     
        appView.addJavascriptInterface(cna, "CustomeNativeAccess");   
        super.loadUrl("file:///android_asset/www/index.html");
    }
}