package edu.psu.jbr5410.paramount;

import java.util.List;

public class Party {
    private String name;
    private String host;
    private String email;
    private String phoneNumber;
    private int day;
    private int month;
    private int year;
    private int dayOfWeek;
    private int partyPackage;
    private List<Integer> roomsRequested;

    public int getDay() { return day; }

    void setDay(int day) { this.day = day; }

    public int getMonth() { return month; }

    void setMonth(int month) { this.month = month; }

    public int getYear() { return year; }

    void setYear(int year) { this.year = year; }

    public int getDayOfWeek() { return dayOfWeek; }

    void setDayOfWeek(int dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public int getPartyPackage() {
        return partyPackage;
    }

    void setPartyPackage(int partyPackage) {
        this.partyPackage = partyPackage;
    }

    public List<Integer> getRoomsRequested() { return roomsRequested; }

    void setRoomsRequested(List<Integer> roomsRequested) { this.roomsRequested = roomsRequested; }

    public String getName() { return name; }

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

