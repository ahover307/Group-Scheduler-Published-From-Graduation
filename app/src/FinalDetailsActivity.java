package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.FirebaseFirestore;

public class FinalDetailsActivity extends AppCompatActivity {
    Button save;
    FirebaseFirestore database;
    EditText party_last, contact_last, email, phoneNumber;
    Party party;
    String date, partyPackage;
    String[] rooms;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        date = intent.getStringExtra("date");
        partyPackage = intent.getStringExtra("package");
        rooms = intent.getStringArrayExtra("rooms");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_final_details);

        contact_last = findViewById(R.id.edit_contact_last);

        party_last = findViewById(R.id.edit_host_last);

        email = findViewById(R.id.edit_contact_email);
        phoneNumber = findViewById(R.id.edit_contact_phone);

        save = findViewById(R.id.button_details_submit);
        party = new Party();
        database = FirebaseFirestore.getInstance();

        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                party.setEmail(email.getText().toString());
                party.setHost(party_last.getText().toString());
                party.setName(contact_last.getText().toString());
                party.setPhoneNumber(phoneNumber.getText().toString());
                party.setDate(date);
                party.setPartyPackage(partyPackage);
                party.setRoom(rooms[0]);

                if (rooms.length >= 1) party.setRoom2(rooms[1]);

                if (rooms.length >= 2) party.setRoom3(rooms[2]);

                database.collection("Parties").add(party);

                Toast.makeText(FinalDetailsActivity.this, "Done", Toast.LENGTH_LONG).show();


            }
        });



    }

}
