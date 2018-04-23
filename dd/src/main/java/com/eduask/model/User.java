package com.eduask.model;

public class User {
    private Integer id;

    private String numberType;

    private String flow;

    private Double money;

    private String phoneNumber;

    private String password;

    private String qq;

    private String name;

    private String idNumber;

    private String halve;

    private String dateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumberType() {
        return numberType;
    }

    public void setNumberType(String numberType) {
        this.numberType = numberType == null ? null : numberType.trim();
    }

    public String getFlow() {
        return flow;
    }

    public void setFlow(String flow) {
        this.flow = flow == null ? null : flow.trim();
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber == null ? null : phoneNumber.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq == null ? null : qq.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber == null ? null : idNumber.trim();
    }

    public String getHalve() {
        return halve;
    }

    public void setHalve(String halve) {
        this.halve = halve == null ? null : halve.trim();
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime == null ? null : dateTime.trim();
    }

	@Override
	public String toString() {
		return "User [id=" + id + ", numberType=" + numberType + ", flow=" + flow + ", money=" + money
				+ ", phoneNumber=" + phoneNumber + ", password=" + password + ", qq=" + qq + ", name=" + name
				+ ", idNumber=" + idNumber + ", halve=" + halve + ", dateTime=" + dateTime + "]";
	}
    
}