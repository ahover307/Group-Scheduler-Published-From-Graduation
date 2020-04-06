package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class PackageActivity extends AppCompatActivity {

    private int day, month, year, dayOfWeek;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_package);

        Intent intent = getIntent();

        day = intent.getIntExtra("day", -1); // Changed to -1 instead of 1 for better debugging
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek", -1);

        EditText textDate = findViewById(R.id.text_date);
        textDate.setText(month + "/" + day + "/" + year);
    }

    public void Submit(View view) {
        Spinner packageSpinner = findViewById(R.id.spinner_packages);
        String partyPackageString = packageSpinner.getSelectedItem().toString();
        int partyPackage = -1;
        switch (partyPackageString) {
            case "Basic": partyPackage = 0; break;
            case "Single Play": partyPackage = 1; break;
            case "Double Play": partyPackage = 2; break;
            case "Triple Play": partyPackage = 3; break;
            case "Ninja Warrior Exclusive": partyPackage = 5; break;
            case "Ninja Warrior Experience": partyPackage = 6; break;
            case "Ninja Warrior Extra": partyPackage = 7; break;
            case "Ninja Warrior Extreme": partyPackage = 8; break;
            case "Sleepover": partyPackage = 9; break;
        }
        Intent intent;
        if (partyPackageString.equals("Double Play"))
            intent = new Intent(this, TwoRoomActivity.class);
        else if (partyPackageString.equals("Triple Play"))
            intent = new Intent(this, ThreeRoomActivity.class);
        else
            intent = new Intent(this, RoomActivity.class);



        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        intent.putExtra("dayOfWeek", dayOfWeek);
        intent.putExtra("package", partyPackage);

        startActivity(intent);
    }

}
