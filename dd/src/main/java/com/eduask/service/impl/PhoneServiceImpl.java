package com.eduask.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduask.dao.PhoneMapper;
import com.eduask.model.Phone;
import com.eduask.service.PhoneService;
@Service
public class PhoneServiceImpl implements  PhoneService {
    @Autowired
	PhoneMapper phonemapper;
	
	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Phone phone) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Phone phone) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Phone selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Phone phone) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Phone phone) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Phone> selectPhoneAll() {
		// TODO Auto-generated method stub
		return   phonemapper.selectPhoneAll();
	}

}
