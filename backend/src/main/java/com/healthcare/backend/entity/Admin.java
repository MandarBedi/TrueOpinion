package com.healthcare.backend.entity;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    
    @Column(name = "department")
    private String department;
    
    @Column(name = "employee_id", unique = true)
    private String employeeId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "admin_level")
    private AdminLevel adminLevel = AdminLevel.STANDARD;
    
    @Column(name = "can_manage_users")
    private Boolean canManageUsers = true;
    
    @Column(name = "can_manage_doctors")
    private Boolean canManageDoctors = true;
    
    @Column(name = "can_view_reports")
    private Boolean canViewReports = true;
    
    // Constructors
    public Admin() {
        super();
        setUserType(UserType.ADMIN);
    }
    
    public Admin(String email, String password, String firstName, String lastName) {
        super(email, password, firstName, lastName);
        setUserType(UserType.ADMIN);
    }
    
    // Getters and Setters
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    
    public AdminLevel getAdminLevel() {
        return adminLevel;
    }
    
    public void setAdminLevel(AdminLevel adminLevel) {
        this.adminLevel = adminLevel;
    }
    
    public Boolean getCanManageUsers() {
        return canManageUsers;
    }
    
    public void setCanManageUsers(Boolean canManageUsers) {
        this.canManageUsers = canManageUsers;
    }
    
    public Boolean getCanManageDoctors() {
        return canManageDoctors;
    }
    
    public void setCanManageDoctors(Boolean canManageDoctors) {
        this.canManageDoctors = canManageDoctors;
    }
    
    public Boolean getCanViewReports() {
        return canViewReports;
    }
    
    public void setCanViewReports(Boolean canViewReports) {
        this.canViewReports = canViewReports;
    }
}

