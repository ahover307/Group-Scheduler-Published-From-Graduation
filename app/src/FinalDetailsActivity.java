package edu.psu.jbr5410.paramount;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.firestore.FirebaseFirestore;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FinalDetailsActivity extends AppCompatActivity implements ConfirmationDialog.DialogListener {
    private EditText party_last, contact_last, email, phoneNumber;
    private int day, month, year, dayOfWeek, partyPackage, price;
    private List<Integer> rooms;
    private int[] roomsTimes;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = getIntent();
        day = intent.getIntExtra("day", -1);
        month = intent.getIntExtra("month", -1);
        year = intent.getIntExtra("year", -1);
        dayOfWeek = intent.getIntExtra("dayOfWeek",-1);
        partyPackage = intent.getIntExtra("package", -1);
        rooms = intent.getIntegerArrayListExtra("rooms");
        roomsTimes = intent.getIntArrayExtra("roomsTimes");

        String total;

        switch (partyPackage) {
            case 0: price = 17500; total = "$175.00"; break;
            case 1: price = 20000; total = "$200.00"; break;
            case 2: price = 25000; total = "$250.00"; break;
            case 3: price = 29000; total = "$290.00"; break;
            case 5: price = 25000; total = "$250.00"; break;
            case 6: price = 22500; total = "$225.00"; break;
            case 7: price = 28500; total = "$285.00"; break;
            case 8: price = 32500; total = "$325.00"; break;
            case 9: price = 57500; total = "$57500"; break;
            default: price = 17500; total = "$175.00"; break;
        }

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_final_details);

        TextView totalText = findViewById(R.id.price_Text);
        totalText.setText(total);

        setUpValidation();

    }

    public void submit(View view) {
        contact_last = findViewById(R.id.edit_contact_last);
        party_last = findViewById(R.id.edit_host_last);
        email = findViewById(R.id.edit_contact_email);
        phoneNumber = findViewById(R.id.edit_contact_phone);

        String contact = contact_last.getText().toString();
        String partyName = party_last.getText().toString();
        String emailS = email.getText().toString();
        String phone = phoneNumber.getText().toString();

        boolean validInfo = true;

        if (contact_last.getText().toString().length() == 0) {
            validInfo = false;
        }

        if (party_last.getText().toString().length() == 0) {
            validInfo = false;
        }

        String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email.getText().toString());
        if (!matcher.matches()) {
            validInfo = false;
        }

        regex = "^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9]" +
                "[02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]" +
                "\\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})";
        pattern = Pattern.compile(regex);
        matcher = pattern.matcher(email.getText().toString());
        if (matcher.matches()) {
            validInfo = false;
        }

        if (!validInfo) {
            Bundle args = new Bundle();
            args.putString("content", "Please make sure the information you entered is valid.");
            args.putString("title", "Invalid Input");
            args.putString("button", "Okay");
            ConfirmationDialog confirmationDialog = new ConfirmationDialog();
            confirmationDialog.setArguments(args);
            confirmationDialog.show(getSupportFragmentManager(), "confirmationDialog");
        }

        if (validInfo) {
            Intent intent = new Intent(this, CheckoutActivity.class);

            intent.putExtra("day", day);
            intent.putExtra("month", month);
            intent.putExtra("year", year);
            intent.putExtra("dayOfWeek", dayOfWeek);
            intent.putExtra("package", partyPackage);
            intent.putExtra("rooms", (Serializable) rooms);
            intent.putExtra("contact", contact);
            intent.putExtra("partyName", partyName);
            intent.putExtra("email", emailS);
            intent.putExtra("phone", phone);
            intent.putExtra("price", price);
            intent.putExtra("roomsTimes", roomsTimes);


            startActivity(intent);
        }
    }

    public void setUpValidation() {
        contact_last = findViewById(R.id.edit_contact_last);
        contact_last.addTextChangedListener(new TextValidator(contact_last) {
            @Override
            public void validate(TextView textView, String text) {
                if (contact_last.getText().toString().length() == 0) {
                    contact_last.setError("Contact name is required!");
                }
            }
        });

        party_last = findViewById(R.id.edit_host_last);
        party_last.addTextChangedListener(new TextValidator(party_last) {
            @Override
            public void validate(TextView textView, String text) {
                if (party_last.getText().toString().length() == 0) {
                    party_last.setError("Contact name is required!");
                }
            }
        });

        email = findViewById(R.id.edit_contact_email);
        email.addTextChangedListener(new TextValidator(email) {
            @Override
            public void validate(TextView textView, String text) {
                String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@" +
                        "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(email.getText().toString());
                if (!matcher.matches()) {
                    email.setError("Email must be a valid email!");
                }
            }
        });

        phoneNumber = findViewById(R.id.edit_contact_phone);
        phoneNumber.addTextChangedListener(new TextValidator(phoneNumber) {
            @Override
            public void validate(TextView textView, String text) {
                String regex = "^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9]" +
                        "[02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]" +
                        "\\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})";
                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(phoneNumber.getText().toString());
                if (!matcher.matches()) {
                    phoneNumber.setError("Phone number must be a valid number!");
                }
            }
        });

    }

    public void onDialogPositiveClick (DialogFragment dialog) {}

    @Override
    public void onRestoreInstanceState(Bundle saved) {
        super.onRestoreInstanceState(saved);

        day = saved.getInt("day");
        month = saved.getInt("month");
        year = saved.getInt("year" );
        dayOfWeek = saved.getInt("dayOfWeek");
        partyPackage = saved.getInt("package");
        rooms = saved.getIntegerArrayList("rooms");
        roomsTimes = saved.getIntArray("roomsTimes");

        String total;

        switch (partyPackage) {
            case 0: price = 17500; total = "$175.00"; break;
            case 1: price = 20000; total = "$200.00"; break;
            case 2: price = 25000; total = "$250.00"; break;
            case 3: price = 29000; total = "$290.00"; break;
            case 5: price = 25000; total = "$250.00"; break;
            case 6: price = 22500; total = "$225.00"; break;
            case 7: price = 28500; total = "$285.00"; break;
            case 8: price = 32500; total = "$325.00"; break;
            case 9: price = 57500; total = "$57500"; break;
            default: price = 17500; total = "$175.00"; break;
        }

        TextView totalText = findViewById(R.id.price_Text);
        totalText.setText(total);

    }


    @Override
    public void onSaveInstanceState(Bundle saved) {
        saved.putInt("day", day);
        saved.putInt("month", month);
        saved.putInt("year", year);
        saved.putInt("dayOfWeek", dayOfWeek);
        saved.putInt("package", partyPackage);
        saved.putIntegerArrayList("rooms", (ArrayList<Integer>) rooms);
        saved.putIntArray("roomsTimes", roomsTimes);

        super.onSaveInstanceState(saved);
    }

}
