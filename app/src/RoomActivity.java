package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Spinner;
import android.widget.TextView;

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


        Spinner spinner = findViewById(R.id.spinner_rooms);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                String room = spinner.getSelectedItem().toString();
                TextView description = findViewById(R.id.text_roomDescription);
                switch(room) {
                    case "Main Gym": description.setText("This is the main gym."); break;
                    case "Kid Maze": description.setText("Kidmazium at Paramount Sports Complex is a multi-level climbing and play structure for children. It includes tubes, nets, tunnels and slides for climbing, crawling and sliding fun! There is even a \"bouncy-house\" included!"); break;
                        case "Rockwall": description.setText("In order to use our rockwall at Paramount by yourself and a friend, you and/or your friend need to be belay certified.  If you are interested, please let us know and our instructor can certify you with a belay course that lasts about 45 minutes (cost $15). If you have been belay certified elsewhere, arrange a time to show our climbing staff that you can belay, and then there is a $5 charge to keep a certification on file.\n" +
                                "\nHowever, if you are not belay certified, we can supply the belayer!  Call us to arrange a time for your group (5 or more participants minimum.  $15 per person for 2 hours)."); break;
                    case "Preschool Room": description.setText("Appropriate for 3-5 year olds."); break;
                    case "Ninja Room": description.setText("Ninja Warrior training is a great way to build a solid strength, flexibility, and movement base for any sport. Our experienced instructors will train you to progress from the “easy” obstacles to the almost impossible!");
                }

            }



            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // your code here
            }

        });

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
