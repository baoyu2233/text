package com.eduask.model;

public class Phone {
    private Integer id;

    private String phoneNumber;

    private String setMeal;

    private Double price;

    private String commodityname;

    private String sold;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber == null ? null : phoneNumber.trim();
    }

    public String getSetMeal() {
        return setMeal;
    }

    public void setSetMeal(String setMeal) {
        this.setMeal = setMeal == null ? null : setMeal.trim();
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCommodityname() {
        return commodityname;
    }

    public void setCommodityname(String commodityname) {
        this.commodityname = commodityname == null ? null : commodityname.trim();
    }

    public String getSold() {
        return sold;
    }

   

	public void setSold(String sold) {
        this.sold = sold == null ? null : sold.trim();
    }
	 @Override
		public String toString() {
			return "Phone [id=" + id + ", phoneNumber=" + phoneNumber + ", setMeal=" + setMeal + ", price=" + price
					+ ", commodityname=" + commodityname + ", sold=" + sold + "]";
		}
}