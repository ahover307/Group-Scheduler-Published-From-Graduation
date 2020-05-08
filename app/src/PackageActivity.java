package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

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

        TextView textDate = findViewById(R.id.text_date);
        textDate.setText(month + "/" + day + "/" + year);




        Spinner spinner = findViewById(R.id.spinner_packages);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                String room = spinner.getSelectedItem().toString();
                TextView description = findViewById(R.id.text_packageDescription);
                switch(room) {
                    case "Single Play": description.setText("2 hour party - $200\n" +
                            "Eighty minutes in any ONE play area, followed by forty minutes in a party room\n" +
                            "Play areas: main gym / Kidmazium / rockwall / preschool gym\n" +
                            "This party package is for up to 20 participants. $8 for each extra participant."); break;
                    case "Double Play": description.setText("2 hour party - $250\n" +
                            "Forty minutes in any ONE play area, followed by 40 minutes in a SECOND play area, followed by 40 minutes in a party room\n" +
                            "Play areas: main gym / Kidmazium / rockwall / preschool gym\n" +
                            "This party package is for up to 20 participants. $8 for each extra participant."); break;
                    case "Triple Play": description.setText("2.5 hour party - $290\n" +
                            "Forty minutes in ONE play area, 40 minutes in a SECOND party area followed by 40 minutes in a THIRD area, finishing with 30 minutes in a party room.\n" +
                            "Play areas: main gym / Kidmazium / rockwall / preschool gym\n" +
                            "This party package is for up to 20 participants. $8 for each extra participant."); break;
                    case "Basic": description.setText("1.5 hour party - $175\n" +
                            "Sixty minutes in any ONE play area, followed by thirty minutes in a party room\n" +
                            "Play areas: main gym / Kidmazium / rockwall / preschool gym\n" +
                            "\nThis party package is for up to 20 participants. $8 for each extra participant."); break;
                    case "Sleepover": description.setText("9:00pm - 7:00am - $575\n" +
                            "A fun-filled night with unlimited use of Kidmazium and the Main gym.\n" +
                            "Add the Rock Wall for an extra $50.\n\n" +
                            "Add one hour in the Ninja Warrior Course at the start of your sleepover for $100.\n" +
                            "Sleepovers are for up to 25 participants. $12 for each additional participant.\n" +
                            "Sleepover maximum age limit is 12 years. No co-ed sleepovers.\n" +
                            "\nThis does not apply to groups booking an overnight event."); break;
                    case "Ninja Warrior Experience": description.setText("1.5 hour party  $225\n" +
                            "30 mins main gym or Kidmazium, 30 mins ninja warrior course, 30 mins party room.\n" +
                            "Up to 15 participants ($10 for each extra)"); break;
                    case "Ninja Warrior Exclusive": description.setText("1.5 hour party  $250\n" +
                            "50 mins ninja warrior course, 40 mins party room.\n" +
                            "Up to 15 participants ($10 for each extra)"); break;
                    case "Ninja Warrior Extra": description.setText("2 hour party  $285\n" +
                            "40 mins main gym or Kidmazium, 40 mins ninja warrior course, 40 mins party room.\n" +
                            "Up to 15 participants ($10 for each extra)"); break;
                    case "Ninja Warrior Extreme": description.setText("2.5 hour party  $325\n" +
                            "60 mins main gym or Kidmazium, 50 mins ninja warrior course.\n" +
                            "40 mins party room. Up to 15 participants ($10 for each extra)"); break;

                }

            }



            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // your code here
            }

        });
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
        else if (partyPackageString.equals("Ninja Warrior Exclusive")) {
            intent = new Intent(this, TimeslotActivity.class);
            String[] rooms = {"Ninja Room"};
            intent.putExtra("rooms", rooms);
        }
        else if (partyPackageString.equals("Ninja Warrior Experience")) {
            intent = new Intent(this, TimeslotActivity.class);
            String[] rooms = {"Ninja Room"};
            intent.putExtra("rooms", rooms);
        }
        else if (partyPackageString.equals("Ninja Warrior Extra")) {
            intent = new Intent(this, TimeslotActivity.class);
            String[] rooms = {"Ninja Room"};
            intent.putExtra("rooms", rooms);
        }
        else if (partyPackageString.equals("Ninja Warrior Extreme")) {
            intent = new Intent(this, TimeslotActivity.class);
            String[] rooms = {"Ninja Room"};
            intent.putExtra("rooms", rooms);
        }
        else
            intent = new Intent(this, RoomActivity.class);


        intent.putExtra("day", day);
        intent.putExtra("month", month);
        intent.putExtra("year", year);
        intent.putExtra("dayOfWeek", dayOfWeek);
        intent.putExtra("package", partyPackage);

        startActivity(intent);
    }

    @Override
    public void onRestoreInstanceState(Bundle saved) {
        super.onRestoreInstanceState(saved);

        day = saved.getInt("day");
        month = saved.getInt("month");
        year = saved.getInt("year" );
        dayOfWeek = saved.getInt("dayOfWeek");

        TextView textDate = findViewById(R.id.text_date);
        textDate.setText(month + "/" + day + "/" + year);

    }

    @Override
    public void onSaveInstanceState(Bundle saved) {
        saved.putInt("day", day);
        saved.putInt("month", month);
        saved.putInt("year", year);
        saved.putInt("dayOfWeek", dayOfWeek);

        super.onSaveInstanceState(saved);
    }

}
