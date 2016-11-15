package ctrlfagency.com;
/*
 * Author : Thibaut LOMBARD
 * 2016 - 2017
 * */
import java.util.ArrayList;
import java.util.Locale;

import java.util.ArrayList;
import java.util.Locale;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    private final int SPEECH_RECOGNITION_CODE = 1;

    private ImageButton btnMicrophone;
    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Déclare mWebView à activity_main (le layout)
        mWebView = (WebView) findViewById(R.id.activity_main_webview);

        // Configure la webview pour l'utilisation du javascript
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        //Les lignes suivantes ne sont pas forcément utiles
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setDomStorageEnabled(true);


        // Charge l'url
        mWebView.loadUrl("file:///android_asset/index.html");
        mWebView.setWebViewClient(new WebViewClient());
        btnMicrophone = (ImageButton) findViewById(R.id.btn_mic);

        btnMicrophone.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startSpeechToText();
            }
        });
    }

    private class WebViewClient extends android.webkit.WebViewClient
    {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url)
        {
            return super.shouldOverrideUrlLoading(view, url);
        }
    }
    /**
     * Démarre l'opération Speech to Text (intent). 
     * Autorise l'ouverture d'une fenêtre popup (Google Speech Recognition API) permettant l'écoute des commandes vocales.
     * */
    private void startSpeechToText() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT,
                "Dîtes quelque chose...");
        try {
            startActivityForResult(intent, SPEECH_RECOGNITION_CODE);
        } catch (ActivityNotFoundException a) {
            Toast.makeText(getApplicationContext(),
                    "La reconnaissance vocale n'est pas activée sur votre appareil.",
                    Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * Callback pour l'activity de reconnaissance vocale
     * */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case SPEECH_RECOGNITION_CODE: {
                if (resultCode == RESULT_OK && null != data) {

                    ArrayList<String> result = data
                            .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String text = result.get(0);
                    mWebView.loadUrl("javascript:fonctionjs('"+text+"');");
                }
                break;
            }

        }
    }
}
