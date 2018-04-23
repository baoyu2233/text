package com.eduask.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import com.eduask.model.Phone;
import com.eduask.service.PhoneService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Controller
@RequestMapping("/to")
public class ActionController {
	private Phone phone;

	@Autowired
	PhoneService phoneservice;

	@RequestMapping("/paging")
	@ResponseBody
	public Object paging(int pageNum) {

		if (pageNum== 0) {
			// 通知开始分页
			PageHelper.startPage(1, 10);
		} else {
			PageHelper.startPage(pageNum,10);
		}
		// 获取所有的user集合
		List<Phone> userList = phoneservice.selectPhoneAll();
		// 将userList放入pageInfo中
		// 如果要取pageInfo中的数据 pageInfo.list();
		PageInfo<Phone> pageInfo = new PageInfo<Phone>(userList);
		if(pageInfo.getTotal()==pageInfo.getEndRow()){
			pageInfo.setPageNum(0);
			
			
		}
		
		/*List<Phone> phonelist = phoneservice.selectPhoneAll();*/

		return JSON.toJSON(pageInfo);
	}

	public Phone getPhone() {
		return phone;
	}

	public void setPhone(Phone phone) {
		this.phone = phone;
	}



}
