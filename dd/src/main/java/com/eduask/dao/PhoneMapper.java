package com.eduask.dao;

import java.util.List;


import com.eduask.model.Phone;

public interface PhoneMapper {
	
    int deleteByPrimaryKey(Integer id);

    int insert(Phone phone);

    int insertSelective(Phone phone);

    Phone selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Phone phone);

    int updateByPrimaryKey(Phone phone);
    
    List<Phone>  selectPhoneAll();
}