package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Spinner;

public class RoomActivity extends AppCompatActivity {

    private int day, month, year, dayOfWeek, partyPackage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_room);

        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek",-1);
        partyPackage = intent.getIntExtra("package", -1);

    }

    public void submit(View view) {
        Intent intent = new Intent(this, TimeslotActivity.class);

        Spinner roomSpinner = findViewById(R.id.spinner_rooms);
        String room = roomSpinner.getSelectedItem().toString();
        String[] rooms = {room};

        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        intent.putExtra("dayOfWeek", dayOfWeek);
        intent.putExtra("package", partyPackage);
        intent.putExtra("rooms", rooms);

        startActivity(intent);
    }


}
