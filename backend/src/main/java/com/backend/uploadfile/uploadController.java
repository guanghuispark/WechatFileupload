package com.backend.uploadfile;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;



@RestController
@RequestMapping("/upload")
public class uploadController {

	static String sql = null;  
    static DBHelper db1 = null;  
    static ResultSet ret = null;  
    
    

        

	private static final Logger LOG = LoggerFactory
			.getLogger(uploadController.class);
	
	 @RequestMapping(value = "/fileUpload", method = {RequestMethod.POST, RequestMethod.GET, RequestMethod.OPTIONS})
	public String uploadMusicFile(HttpServletRequest request,@RequestParam("id") String id,@RequestParam("filename") String filename,@RequestParam("file")MultipartFile[] files){
		LOG.info("进入上传...");
		String uploadPath="C:/uploadfiles/";//存放到本地路径（示例）
		if(files!=null && files.length>=1) {
	            BufferedOutputStream bw = null;
	            try {
	                //String fileName = files[0].getOriginalFilename();
	            	String fileName = filename;
	            	LOG.info(fileName);
	                //判断是否有文件
	                if(StringUtils.isNoneBlank(fileName)) {
                        //输出到本地路径
	                	Date day=new Date();    
	                	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss"); 
	                	System.out.println(df.format(day));
	                	uploadPath=uploadPath +df.format(day)+"/"+ fileName;
	                	File outFile = new File(uploadPath); 
	                	//LOG.info("path=="+uploadPath + UUID.randomUUID().toString()+ FileUtil.getFileType(fileName));         
	                	FileUtils.copyInputStreamToFile(files[0].getInputStream(), outFile);  
	                	}          
	                } catch (Exception e) { 
	                	
	                	e.printStackTrace();
	                	return "上传文件失败";
	                	} finally {               
	                		try {                  
	                			if(bw!=null) {
	                				bw.close();
	                				}          
	                			} catch (IOException e) {             
	                				e.printStackTrace();            
	                				}        
	                		}
	            
	            
	            
	            sql = "select * from information where id=\""+id+"\"";//SQL语句  
	            db1 = new DBHelper(sql);//创建DBHelper对象
	            
	            try {  
	                ret = db1.pst.executeQuery();//执行语句，得到结果集  
	                if(ret.next()) {  
	                	//更新数据
	                	String	updatesql="update information set filePath=\""+uploadPath +"\"where id=\""+id+"\"" ;
	                	db1.pst.executeUpdate(updatesql);
	                	
	                }else{
	                	//插入数据
	                	String insertsql="insert into information values("+id+",null,null,null,null,null,null,null,null,null,null,\""+uploadPath+"\",null) ";
	                	db1.pst.executeUpdate(insertsql);
	                }
	                ret.close();  
	                db1.close();//关闭连接 
	                
	            } catch (SQLException e) {  
	                e.printStackTrace();  
	                return "数据库更新错误";
	            }  
	            	}
			return "success";
	        }

	
	 @RequestMapping(value = "/infoUpload", method = {RequestMethod.POST, RequestMethod.GET, RequestMethod.OPTIONS})
	public String uploadinformation(@RequestBody information req){
		 LOG.info("req: {}", req);
		sql = "select * from information where id=\""+req.id+"\"";//SQL语句 
		LOG.info(sql);
        db1 = new DBHelper(sql);//创建DBHelper对象
        
        try {  
            ret = db1.pst.executeQuery();//执行语句，得到结果集  
            if(ret.next()) {  
                //更新数据
            	String updatesql="update information set number=\'"+req.number+"\',name=\'"+req.name+"\',phone=\'"+req.phoneNumber+"\',sitution=\'"+req.sitution+"\',company=\'"+req.companyname+"\',agreement=\'"+req.agreement+"\',plandate=\'"+req.plandate+"\',realdate=\'"+req.realdate+"\',sumdate=\'"+req.sumdate+"\',description=\'"+req.describe+"\',remakes=\'"+req.remakes+"\' where id=\'"+req.id+"\'";
            	LOG.info(updatesql);
            	db1.pst.executeUpdate(updatesql);
            }
            else{
            	//插入数据
            	String insertsql="insert into information values(\'"+req.id+"\',\'"+req.number+"\',\'"+req.name+"\',\'"+req.phoneNumber+"\',\'"+req.sitution+"\',\'"+req.companyname+"\',\'"+req.agreement+"\',\'"+req.plandate+"\',\'"+req.realdate+"\',\'"+req.sumdate+"\',\'"+req.describe+"\',null,\'"+req.remakes+"\')";
            	LOG.info(insertsql);
            	db1.pst.executeUpdate(insertsql);
            }
            ret.close();  
            db1.close();//关闭连接  
        } catch (SQLException e) {  
            e.printStackTrace();  
            return "数据库更新失败";
        }  
		
		return "success";
	}
	
	 @RequestMapping(value = "/infoCheck", method = {RequestMethod.POST, RequestMethod.GET, RequestMethod.OPTIONS})
	public String infoCheck( @RequestParam("id") String id){
		String result="";
		sql = "select * from information where id=\""+id+"\"";//SQL语句  
        db1 = new DBHelper(sql);//创建DBHelper对象
        
        try {  
            ret = db1.pst.executeQuery();//执行语句，得到结果集  
            if(ret.next()) {  
                //获取数据
            	String number=ret.getString("number");
            	String name=ret.getString("name");
            	String phoneNumber=ret.getString("phone");
            	String sitution=ret.getString("sitution");
            	String companyname=ret.getString("company");
            	String agreement=ret.getString("agreement");
            	String plandate=ret.getString("plandate");
            	String realdate=ret.getString("realdate");
            	String sumdate=ret.getString("sumdate");
            	String describe=ret.getString("description");
            	String filePath=ret.getString("filePath");
            	String remakes=ret.getString("remakes");
            	
            	information info= new information(id,number,name,phoneNumber,sitution,companyname,agreement,plandate,realdate,sumdate,describe,filePath,remakes);
            	 result = JSONObject.toJSONString(info, SerializerFeature.WriteMapNullValue);
                System.out.println(result);
            }
            
            ret.close();  
            db1.close();//关闭连接  
        } catch (SQLException e) {  
            e.printStackTrace();  
            return "数据库查询异常";
        }
        LOG.info(result);
		return result;
	}
	

	
}
	



	
	