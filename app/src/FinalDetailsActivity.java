package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.firestore.FirebaseFirestore;

public class FinalDetailsActivity extends AppCompatActivity {
    private Button save;
    private FirebaseFirestore database;
    private EditText party_last, contact_last, email, phoneNumber;
    private Party party;
    private int day, month, year, dayOfWeek;
    private String partyPackage;
    private String[] rooms;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek",-1);
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
                party.setDay(day);
                party.setMonth(month);
                party.setYear(year);
                party.setDayOfWeek(dayOfWeek);
                party.setPartyPackage(partyPackage);
                party.setRoom(rooms[0]);

                if (rooms.length > 1) party.setRoom2(rooms[1]);

                if (rooms.length > 2) party.setRoom3(rooms[2]);

                database.collection("Parties").add(party);

                Toast.makeText(FinalDetailsActivity.this, "Done", Toast.LENGTH_LONG).show();


            }
        });



    }


}
