package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.icu.util.Calendar;
import android.os.Bundle;
import android.view.View;
import android.widget.CalendarView;


import java.util.Date;



public class CalendarActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);
    }

    public void Button(View view) {
        Intent intent = new Intent(this, PackageActivity.class);
        CalendarView calendar = findViewById(R.id.calendarView);
        Long date = calendar.getDate();
        intent.putExtra("date", date);
        startActivity(intent);
    }
}
