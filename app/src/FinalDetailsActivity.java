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
    private int day, month, year, dayOfWeek, partyPackage;
    private List<Integer> rooms;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek",-1);
        partyPackage = intent.getIntExtra("package", -1);
        rooms = intent.getIntegerArrayListExtra("rooms");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_final_details);

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

        startActivity(intent);
    }

}
