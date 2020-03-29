package edu.psu.jbr5410.paramount;

public class Party {
    private String name;
    private String host;
    private String email;
    private String phoneNumber;
    private int day;
    private int month;
    private int year;
    private int dayOfWeek;
    private String partyPackage;
    private String room;

    private String room2;
    private String room3;

    public int getDay() { return day; }

    void setDay(int day) { this.day = day; }

    public int getMonth() { return month; }

    void setMonth(int month) { this.month = month; }

    public int getYear() { return year; }

    void setYear(int year) { this.year = year; }

    public int getDayOfWeek() { return dayOfWeek; }

    void setDayOfWeek(int dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public String getRoom2() {
        return room2;
    }

    void setRoom2(String room2) {
        this.room2 = room2;
    }

    public String getRoom3() {
        return room3;
    }

    void setRoom3(String room3) {
        this.room3 = room3;
    }


    public String getPartyPackage() {
        return partyPackage;
    }

    void setPartyPackage(String partyPackage) {
        this.partyPackage = partyPackage;
    }

    public String getRoom() {
        return room;
    }

    void setRoom(String room) {
        this.room = room;
    }

    public String getName() {
        return name;
    }

    void setName(String name) {
        this.name = name;
    }

    public String getHost() {
        return host;
    }

    void setHost(String host) {
        this.host = host;
    }

    public String getEmail() {
        return email;
    }

    void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

//    public Party(String name, String host, String email, String phoneNumber) {
//        this.name = name;
//        this.host = host;
//        this.email = email;
//        this.phoneNumber = phoneNumber;
//    }

    Party() {

    }
}

