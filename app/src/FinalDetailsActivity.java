package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.firestore.FirebaseFirestore;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class FinalDetailsActivity extends AppCompatActivity {
    private EditText party_last, contact_last, email, phoneNumber;
    private int day, month, year, dayOfWeek, partyPackage, price;
    private List<Integer> rooms;
    private int[] roomsTimes;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek",-1);
        partyPackage = intent.getIntExtra("package", -1);
        rooms = intent.getIntegerArrayListExtra("rooms");
        roomsTimes = intent.getIntArrayExtra("roomsTimes");

        String total;

        switch (partyPackage) {
            case 0: price = 17500; total = "$175.00"; break;
            case 1: price = 20000; total = "$200.00"; break;
            case 2: price = 25000; total = "$250.00"; break;
            case 3: price = 29000; total = "$290.00"; break;
            case 5: price = 25000; total = "$250.00"; break;
            case 6: price = 22500; total = "$225.00"; break;
            case 7: price = 28500; total = "$285.00"; break;
            case 8: price = 32500; total = "$325.00"; break;
            case 9: price = 57500; total = "$57500"; break;
            default: price = 17500; total = "$175.00"; break;
        }

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_final_details);

        EditText totalText = findViewById(R.id.price_Text);
        totalText.setText(total);

        contact_last = findViewById(R.id.edit_contact_last);

        party_last = findViewById(R.id.edit_host_last);

        email = findViewById(R.id.edit_contact_email);
        phoneNumber = findViewById(R.id.edit_contact_phone);

    }

    public void submit(View view) {
        Intent intent = new Intent(this, CheckoutActivity.class);

        contact_last = findViewById(R.id.edit_contact_last);
        party_last = findViewById(R.id.edit_host_last);
        email = findViewById(R.id.edit_contact_email);
        phoneNumber = findViewById(R.id.edit_contact_phone);

        String contact = contact_last.getText().toString();
        String partyName = party_last.getText().toString();
        String emailS = email.getText().toString();
        String phone = phoneNumber.getText().toString();

        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        intent.putExtra("dayOfWeek", dayOfWeek);
        intent.putExtra("package", partyPackage);
        intent.putExtra("rooms", (Serializable) rooms);
        intent.putExtra("contact", contact);
        intent.putExtra("partyName", partyName);
        intent.putExtra("email", emailS);
        intent.putExtra("phone", phone);
        intent.putExtra("price", price);
        intent.putExtra("roomsTimes", roomsTimes);

        startActivity(intent);
    }

    /*@Override
    public void onRestoreInstanceState(Bundle saved) {
        super.onRestoreInstanceState(saved);

        day = saved.getInt("day");
        month = saved.getInt("month");
        year = saved.getInt("year" );
        dayOfWeek = saved.getInt("dayOfWeek");
        partyPackage = saved.getInt("package");
        rooms = saved.getIntegerArrayList("rooms");

        String total;

        switch (partyPackage) {
            case 0: price = 17500; total = "$175.00"; break;
            case 1: price = 20000; total = "$200.00"; break;
            case 2: price = 25000; total = "$250.00"; break;
            case 3: price = 29000; total = "$290.00"; break;
            case 5: price = 25000; total = "$250.00"; break;
            case 6: price = 22500; total = "$225.00"; break;
            case 7: price = 28500; total = "$285.00"; break;
            case 8: price = 32500; total = "$325.00"; break;
            case 9: price = 57500; total = "$57500"; break;
            default: price = 17500; total = "$175.00"; break;
        }

        EditText totalText = findViewById(R.id.price_Text);
        totalText.setText(total);

    }*/

}
