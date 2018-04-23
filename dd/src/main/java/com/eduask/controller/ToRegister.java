package com.eduask.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class ToRegister {
	@RequestMapping("/toregister")
	@ResponseBody
   public ModelAndView toregister(String phonename){
		

		ModelAndView  mv=new ModelAndView ();
		mv.addObject("phonename",phonename);
		
		mv.setViewName("register");
	  return mv; 
   }
}
