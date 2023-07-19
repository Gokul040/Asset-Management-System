package com.AMS.AssetManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.Date;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee" )
public class Employee {
    @Id
    @GeneratedValue(generator ="employee_seq", strategy = GenerationType.AUTO)
    @SequenceGenerator(name="employee_seq", sequenceName = "employee_seq",initialValue = 1,allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "employee_roll_number",unique=true)
    private String employeeRollNumber;

    @Column(name = "employee_name")
    private String employeeName;

    @Column(name = "employee_contact_number",unique=true)
    private String employeeContact;

    @Column(name = "employee_email",unique=true)
    private String employeeEmail;

    @OneToOne
    @JoinColumn(name = "asset_location_id",referencedColumnName = "id")
    AssetLocation assetLocation;

    @OneToOne
    @JoinColumn(name = "asset_details_id",referencedColumnName = "id")
    AssetDetails assetDetails;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "created_date")
    private Date createdDate ;

    @Column(name = "updated_date")
    private Date updatedDate ;

    public Employee(@NonNull String employeeRollNumber, String employeeName, String employeeContact, String employeeEmail, Boolean status) {
        this.employeeRollNumber = employeeRollNumber;
        this.employeeName = employeeName;
        this.employeeContact = employeeContact;
        this.employeeEmail = employeeEmail;
        this.status = status;
    }


}
