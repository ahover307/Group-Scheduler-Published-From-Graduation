package edu.psu.jbr5410.paramount;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.functions.FirebaseFunctionsException;
import com.google.firebase.functions.HttpsCallableResult;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TimeslotActivity extends AppCompatActivity implements ConfirmationDialog.DialogListener {

    private int day, month, year, dayOfWeek, partyPackage;
    private String[] roomsStrings;
    private List<Integer> rooms = new ArrayList<>();
    private List<Integer> times;


    private List<Integer> testRooms = new ArrayList<>();
    public int[] testArray = {1, 3, 4};
    public ArrayList<int[]> integers = new ArrayList<>();

    private FirebaseFunctions mFunctions;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek", -1);
        partyPackage = intent.getIntExtra("package", -1);
        roomsStrings = intent.getStringArrayExtra("rooms");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_timeslot);

        Spinner spinner = findViewById(R.id.spinner);
        List<String> loading = new ArrayList<String>();
        loading.add("Loading...");


        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                this, android.R.layout.simple_spinner_item, loading
        );
        spinner.setAdapter(adapter);

        rooms.add(getRoomInt(roomsStrings[0]));
        System.out.println(roomsStrings[0]);

        if (roomsStrings.length > 1) rooms.add(getRoomInt(roomsStrings[1]));


        if (roomsStrings.length > 2) rooms.add(getRoomInt(roomsStrings[2]));

        mFunctions = FirebaseFunctions.getInstance();

        try {

            // testRooms.add(1);

            partyTimes();
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    private void partyTimes() throws JSONException{

        getTimes(partyPackage, dayOfWeek, rooms, day, month, year)
                .addOnCompleteListener(new OnCompleteListener<List<Integer>>() {
                    @Override
                    public void onComplete(@NonNull Task<List<Integer>> task) {
                        if (!task.isSuccessful()) {
                            Exception e = task.getException();
                            if (e instanceof FirebaseFunctionsException) {
                                FirebaseFunctionsException ffe = (FirebaseFunctionsException) e;
                                FirebaseFunctionsException.Code code = ffe.getCode();
                                Object details = ffe.getDetails();
                            }

                        }
                        times = task.getResult();

                        if (!times.isEmpty()) {
                            fillTimes();
                        } else {
                            emptySpinner();

                            Bundle args = new Bundle();
                            args.putString("content", "No times available. Please go back and select a different package and/or date.");
                            args.putString("title", "Party Times");
                            args.putString("button", "Okay");
                            ConfirmationDialog confirmationDialog = new ConfirmationDialog();
                            confirmationDialog.setArguments(args);
                            confirmationDialog.show(getSupportFragmentManager(), "confirmationDialog");
                            // TODO

                        }

                    }
                });


    }

    private void emptySpinner() {
        Spinner spinner = findViewById(R.id.spinner);
        List<String> empty = new ArrayList<String>();
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                this, android.R.layout.simple_spinner_item, empty
        );
        spinner.setAdapter(adapter);
    }

    private void fillTimes() {
        List<String> timesList = new ArrayList<String>();

        Integer[] timesArray = new Integer[times.size()];
        timesArray = times.toArray(timesArray);


        Spinner spinner = findViewById(R.id.spinner);

        // timesList.addAll(times);

        if (partyPackage == 2) {
            String room1 = "";
            String room2 = "";
            String time1 = "";
            String time2 = "";
            String time3 = "";

            int room1int = 0;
            int room2int = 0;
            int time2int = 0;
            int time1int = 0;
            int time3int = 0;


            int counter = 1;
            String addThis = "";


            for (int i = 0; i < timesArray.length; i++) {
                if (counter % 5 == 1) {
                    room1 = getRoomString(timesArray[i]);
                    room1int = timesArray[i];
                    counter++;
                } else if (counter % 5 == 2) {
                    room2 = getRoomString(timesArray[i]);
                    room2int = timesArray[i];
                    counter++;
                } else if (counter % 5 == 3) {
                    time1 = intTimeToString(timesArray[i]);
                    time1int = timesArray[i];
                    counter++;
                } else if (counter % 5 == 4) {
                    time2 = intTimeToString(timesArray[i]);
                    time2int = timesArray[i];
                    counter++;
                } else if (counter % 5 == 0) {
                    time3 = intTimeToString(timesArray[i]);
                    time3int = timesArray[i];
                    addThis = room1 + ": " + time1 + "-" + time2 + ", " + room2 + ": " + time2 + "-" + time3;
                    counter++;
                    timesList.add(addThis);
                    integers.add(new int[]{room1int, room2int, time1int, time2int, time3int});
                    addThis = "";
                }
            }


        } else if (partyPackage == 3) {
            String room1 = "";
            String room2 = "";
            String room3 = "";
            String time1 = "";
            String time2 = "";
            String time3 = "";
            String time4 = "";

            int room1int = 0;
            int room2int = 0;
            int room3int = 0;
            int time2int = 0;
            int time1int = 0;
            int time3int = 0;
            int time4int = 0;


            int counter = 1;
            String addThis = "";


            for (int i = 0; i < timesArray.length; i++) {
                if (counter % 7 == 1) {
                    room1 = getRoomStringTriplePlay(timesArray[i]);
                    room1int = timesArray[i];
                    counter++;
                } else if (counter % 7 == 2) {
                    room2 = getRoomStringTriplePlay(timesArray[i]);
                    room2int = timesArray[i];
                    counter++;
                } else if (counter % 7 == 3) {
                    room3 = getRoomStringTriplePlay(timesArray[i]);
                    room3int = timesArray[i];
                    counter++;
                } else if (counter % 7 == 4) {
                    time1 = intTimeToString(timesArray[i]);
                    time1int = timesArray[i];
                    counter++;
                } else if (counter % 7 == 5) {
                    time2 = intTimeToString(timesArray[i]);
                    time2int = timesArray[i];
                    counter++;
                } else if (counter % 7 == 6) {
                    time3 = intTimeToString(timesArray[i]);
                    time3int = timesArray[i];
                    counter++;
                } else if (counter % 7 == 0) {
                    time4 = intTimeToString(timesArray[i]);
                    time4int = timesArray[i];
                    addThis = room1 + ": " + time1 + "-" + time2 + ", " + room2 + ": " + time2 + "-" + time3 + ", \n" + room3 + ": " + time3 + "-" + time4;
                    counter++;
                    timesList.add(addThis);
                    integers.add(new int[]{room1int, room2int, room3int, time1int, time2int, time3int, time4int});
                    addThis = "";
                }
            }
            TextView abbreviations = findViewById(R.id.abbreviations);
            abbreviations.setText("Abbreviations:\n\nMG: Main Gym\nKM: Kidmazium\nRW: Rockwall\nPR: Preschool Room");

        } else {
            int counter = 1;
            String room1 = "";
            String time1 = "";
            String time2 = "";
            String addThis = "";

            int room1int = 0;
            int time1int = 0;
            int time2int = 0;


            for (int i = 0; i < timesArray.length; i++) {
                if (counter % 3 == 1) {
                    room1 = getRoomString(timesArray[i]);
                    room1int = timesArray[i];
                    counter++;
                } else if (counter % 3 == 2) {
                    time1 = intTimeToString(timesArray[i]);
                    time1int = timesArray[i];
                    counter++;
                } else if (counter % 3 == 0) {
                    time2 = intTimeToString(timesArray[i]);
                    time2int = timesArray[i];
                    counter++;
                    addThis = room1 + ": " + time1 + "-" + time2;
                    timesList.add(addThis);
                    integers.add(new int[]{room1int, time1int, time2int});
                    addThis = "";
                }
            }
        }


        ArrayAdapter<String> adapter = new ArrayAdapter<String>(
                this, android.R.layout.simple_spinner_item, timesList
        );
        spinner.setAdapter(adapter);

    }


    private Task<List<Integer>> getTimes(int partyPackage, int dayOfWeek, List<Integer> roomsRequested, int day,
                                         int month, int year) throws JSONException {
        // Create the arguments to the callable function.

        JSONObject data = new JSONObject();
        // Map<String, Object> data = new HashMap<>();
        data.put("partyPackage", partyPackage);
        data.put("dayOfWeek", dayOfWeek);
        data.put("roomsRequested", Arrays.toString(roomsRequested.toArray())); // Arrays.toString(roomsRequested.toArray())
        // System.out.println(Arrays.toString(roomsRequested.toArray()));
        data.put("dateDay", day);
        data.put("dateMonth", month);
        data.put("dateYear", year);


        return mFunctions
                .getHttpsCallable("checkPartyTime")
                .call(data)
                .continueWith(new Continuation<HttpsCallableResult, List<Integer>>() {
                    @Override
                    public List<Integer> then(@NonNull Task<HttpsCallableResult> task) throws Exception {
                        // This continuation runs on either success or failure, but if the task
                        // has failed then getResult() will throw an Exception which will be
                        // propagated down.
                        List<Integer> result = (List<Integer>) task.getResult().getData();
                        // System.out.println(task.getResult().getData());
                        return result;
                    }
                });

//        } else {
//            return mFunctions
//                    .getHttpsCallable("checkPartyTimeOne")
//                    .call(data)
//                    .continueWith(new Continuation<HttpsCallableResult, String>() {
//                        @Override
//                        public String then(@NonNull Task<HttpsCallableResult> task) throws Exception {
//                            // This continuation runs on either success or failure, but if the task
//                            // has failed then getResult() will throw an Exception which will be
//                            // propagated down.
//                            String result = (String) task.getResult().getData();
//                            System.out.println(result);
//                            return result;
//                        }
//                    });
//        }
    }

    public void Submit(View view) {
        Spinner spinner = findViewById(R.id.spinner);
        int index = spinner.getSelectedItemPosition();
        int[] roomsTimes = integers.get(index);

        System.out.println(Arrays.toString(roomsTimes));

        if (times.isEmpty()) {
            Intent intent = new Intent(this, MainActivity.class);
        }
        else {
            Intent intent = new Intent(this, FinalDetailsActivity.class);

            intent.putExtra("day", day);
            intent.putExtra("month", month);
            intent.putExtra("year", year);
            intent.putExtra("dayOfWeek", dayOfWeek);
            intent.putExtra("package", partyPackage);
            intent.putExtra("rooms", (Serializable) rooms);
            intent.putExtra("roomsTimes", roomsTimes);

            startActivity(intent);
        }
    }


    private int getRoomInt(String room) {
        switch (room) {
            case "Main Gym":
                return 1;
            case "Kid Maze":
                return 2;
            case "Rockwall":
                return 3;
            case "Preschool Room":
                return 4;
        }
        return -1;
    }

    private String getRoomString(int room) {
        switch (room) {
            case 1:
                return "Main Gym";
            case 2:
                return "Kid Maze";
            case 3:
                return "Rockwall";
            case 4:
                return "Preschool Room";
        }
        return "error";
    }

    private String getRoomStringTriplePlay(int room) {
        switch (room) {
            case 1:
                return "MG";
            case 2:
                return "KM";
            case 3:
                return "RW";
            case 4:
                return "PR";
        }
        return "error";
    }

    private String intTimeToString(int time) {
        int hour = (time / 12) % 12;
        int minute = (time % 12) * 5;

        String stringHour = Integer.toString(hour);
        String stringMinute = Integer.toString(minute);

        if (minute < 10) {
            stringMinute = "0" + minute;
        }

        if (hour == 0) stringHour = "12";

        return (stringHour + ":" + stringMinute);

    }
    public void onDialogPositiveClick (DialogFragment dialog) {
        Intent intent = new Intent(this, CalendarActivity.class);
        startActivity(intent);
    }

    @Override
    public void onRestoreInstanceState(Bundle saved) {
        super.onRestoreInstanceState(saved);

        day = saved.getInt("day");
        month = saved.getInt("month");
        year = saved.getInt("year" );
        dayOfWeek = saved.getInt("dayOfWeek");
        partyPackage = saved.getInt("package");
        roomsStrings = saved.getStringArray("roomStrings");
    }

    @Override
    public void onSaveInstanceState(Bundle saved) {
        saved.putInt("day", day);
        saved.putInt("month", month);
        saved.putInt("year", year);
        saved.putInt("dayOfWeek", dayOfWeek);
        saved.putInt("package", partyPackage);
        saved.putStringArray("roomStrings", roomsStrings);

        super.onSaveInstanceState(saved);
    }
}