package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Spinner;

public class ThreeRoomActivity extends AppCompatActivity {

    public String date;
    public String partyPackage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_three_room);

        Intent intent = getIntent();
        String date = intent.getStringExtra("date");
        String partyPackage = intent.getStringExtra("package");
    }

    public void submit(View view) {
        Intent intent = new Intent(this, FinalDetailsActivity.class);

        Spinner roomSpinner = findViewById(R.id.spinner_rooms);
        String room = roomSpinner.getSelectedItem().toString();
        Spinner roomSpinner2 = findViewById(R.id.spinner_rooms2);
        String room2 = roomSpinner2.getSelectedItem().toString();
        Spinner roomSpinner3 = findViewById(R.id.spinner_rooms3);
        String room3 = roomSpinner3.getSelectedItem().toString();

        String[] rooms = {room, room2, room3};

        intent.putExtra("date", date);
        intent.putExtra("package", partyPackage);
        intent.putExtra("rooms", rooms);

        startActivity(intent);
    }
}
