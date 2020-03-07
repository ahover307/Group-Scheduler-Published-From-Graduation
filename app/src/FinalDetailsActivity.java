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
    FirebaseFirestore ref;
    EditText name, host, email, phoneNumber;
    Party party;
    String date, partyPackage, room;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        date = intent.getStringExtra("date");
        partyPackage = intent.getStringExtra("package");
        room = intent.getStringExtra("room");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_final_details);

        name = (EditText) findViewById(R.id.edit_contact_last);
        host = (EditText) findViewById(R.id.edit_host_last);
        email = (EditText) findViewById(R.id.edit_contact_email);
        phoneNumber = (EditText) findViewById(R.id.edit_contact_phone);

        save = (Button) findViewById(R.id.button_details_submit);
        party = new Party();
        ref = FirebaseFirestore.getInstance();

        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                party.setEmail(email.getText().toString());
                party.setHost(host.getText().toString());
                party.setName(name.getText().toString());
                party.setPhoneNumber(phoneNumber.getText().toString());
                party.setDate(date);
                party.setPartyPackage(partyPackage);
                party.setRoom(room);
                ref.collection("Parties").add(party);

                Toast.makeText(FinalDetailsActivity.this, "Done", Toast.LENGTH_LONG).show();


            }
        });



    }

}
