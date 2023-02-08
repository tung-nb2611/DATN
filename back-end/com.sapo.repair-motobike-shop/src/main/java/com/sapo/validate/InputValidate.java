package com.sapo.validate;

import com.sapo.entities.*;
import com.sapo.exception.InputException;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputValidate {
    
    //Hàm check trùng trong bảng công ( true: trùng , false: không trùng)
    public static boolean checkMonthAndUser(Timesheet timesheet, List<Timesheet> timesheets){
        for (int i =0; i < timesheets.size(); i ++){
            if (timesheet.getId() == timesheets.get(i).getUser().getId() && timesheet.getMonth() == timesheets.get(i).getMonth()){
                return true;
            }
        }
        return false;
    }
    //Hàm validate email
    public static String validateEmail(String email){
        boolean checkEmail = regexEmail(email);
        if (checkEmail == true) {
            return email;
        }
        else {
            throw new InputException("Email không đúng định dạng");
        }
    }
    // Hàm validate storeName
    public static String validateStoreName(String storeName, List<Store> store){
        getSpecialCharacterCount(storeName);
        boolean checkStoreName = checkStoreNameExist(storeName, store);
        if (checkStoreName    == true) {
            return storeName;
        }
        else {
            throw new InputException("tên cửa hàng đã  tồn tại");
        }
    }
    //Hàm kiểm tra tồn tại store name
    public static boolean checkStoreNameExist(String storeName, List<Store> stores){
        for (Store store:  stores) {
            if (storeName.compareTo(store.getName()) == 0){
                return false;
            }
        }
        return true;
    }
    
    //Hàm validate phone
    public static String validatePhone(String phone){
        boolean checkPhone = regexPhone(phone);
        if (checkPhone == true) {
            return phone;
        }
        else {
            throw new InputException("Phone không đúng định dạng");
        }
    }
    
    // Hàm validate username
    public static String validateUsername(String username, List<User> users){
        getSpecialCharacterCount(username);
        boolean checkUsername = checkUsernameExist(username, users);
        if (checkUsername == true) {
            return username;
        }
        else {
            throw new InputException("Username bị trùng");
        }
    }
    
    // Hàm validate serviceName
    public static String validateServiceName(String serviceName, List<Service> services){
        getSpecialCharacterCount(serviceName);
        boolean checkServiceName = checkServiceNameExist(serviceName, services);
        if (checkServiceName == true) {
            return serviceName;
        }
        else {
            throw new InputException("dịch vụ đã tồn tại");
        }
    }
    
    // Hàm kiểm tra phone khách hàng đã tồn tại chưa
    public static String validateCustomerPhone(String phone, List<Customer> customers){
        getSpecialCharacterCount(phone);
        boolean checkCustomerPhone = checkCustomerPhoneExist(phone, customers);
        if (checkCustomerPhone == true) {
            return phone;
        }
        else {
            throw new InputException("số điện thoại đã tồn tại");
        }
    }
    public static String validateLicensePlate(String licensePlate, List<Vehicle> vehicles){
        boolean checkLicensePlate = checkLicensePlateExist(licensePlate, vehicles);
        if (checkLicensePlate == true) {
            return licensePlate;
        }
        else {
            throw new InputException("Biển số xe đã tồn tại");
        }
    }
    
    //hàm kiểm tra kí tự đặc biệt
    public static boolean getSpecialCharacterCount(String s) {
        Pattern p = Pattern.compile("[^A-Za-z0-9]");
        Matcher m = p.matcher(s);
        boolean b = m.find();
        if (b == true)
            return false;
        else
            return true;
    }
    
    //Hàm kiểm tra input phone
    public static boolean regexPhone(String s) {
        Pattern p = Pattern.compile("^(0[3|5|7|8|9])+([0-9]{8})$");
        Matcher m = p.matcher(s);
        boolean b = m.find();
        if (b == true)
            return true;
        else
            return false;
    }
    
    //Hàm kiểm tra email
    public static boolean regexEmail(String s) {
        Pattern p = Pattern.compile("^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)$");
        Matcher m = p.matcher(s);
        boolean b = m.find();
        if (b == true)
            return true;
        else
            return false;
    }
    
    //Hàm kiểm tra tồn tại username
    public static boolean checkUsernameExist(String username, List<User> users){
        for (User user:  users) {
            if (username.compareTo(user.getUsername()) == 0){
                return false;
            }
        }
        return true;
    }
    
    //Hàm kiểm tra tồn tại service name
    public static boolean checkServiceNameExist(String serviceName, List<Service> services){
        for (Service service:  services) {
            if (serviceName.compareTo(service.getName()) == 0){
                return false;
            }
        }
        return true;
    }
    
    //Hàm kiểm tra tồn tại Customer phone
    public static boolean checkCustomerPhoneExist(String phone, List<Customer> customers){
        for (Customer customer:  customers) {
            if (phone.compareTo(customer.getPhone()) == 0){
                return false;
            }
        }
        return true;
    }
    
    //Hàm kiểm tra tồn tại của biển số
    public static boolean checkLicensePlateExist(String licensePlate,  List<Vehicle> vehicles){
        for (Vehicle vehicle:  vehicles) {
            if (licensePlate.compareTo(vehicle.getLicensePlate()) == 0){
                return false;
            }
        }
        return true;
    }
    
}
