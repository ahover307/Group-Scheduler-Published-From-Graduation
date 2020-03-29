package edu.psu.jbr5410.paramount;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class TimeslotActivity extends Activity {

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
        setContentView(R.layout.activity_timeslot);


    }

    public void Submit(View view) {
        Intent intent = new Intent(this, FinalDetailsActivity.class);

        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        intent.putExtra("dayOfWeek", dayOfWeek);
        intent.putExtra("package", partyPackage);
        intent.putExtra("rooms", rooms);

        startActivity(intent);
    }

}