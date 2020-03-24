package edu.psu.jbr5410.paramount;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.Task;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.functions.HttpsCallableResult;

public class CheckoutActivity extends AppCompatActivity {

    private String paymentIntentClientSecret;
    private FirebaseFunctions firebaseFunctions;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_checkout);
        firebaseFunctions = FirebaseFunctions.getInstance();

        startCheckout();
    }

    private void startCheckout() {
        Task<String> task = getPaymentIntent();
        //String json = task.getResult();

        //TextView test = findViewById(R.id.test);
        //test.setText(json);

    }

    private Task<String> getPaymentIntent() {
        return firebaseFunctions.getHttpsCallable("paymentIntent").call()
                .continueWith(new Continuation<HttpsCallableResult, String>() {
                    @Override
                    public String then(@NonNull Task<HttpsCallableResult> task) throws Exception {
                        String result = (String) task.getResult().getData();
                        return result;
                    }
                });
    }
}
