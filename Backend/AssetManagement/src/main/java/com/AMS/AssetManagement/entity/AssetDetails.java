package com.AMS.AssetManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "asset_details")
public class AssetDetails {

    @Id
    @GeneratedValue(generator ="asset_seq", strategy = GenerationType.AUTO)
    @SequenceGenerator(name="asset_seq", sequenceName = "asset_seq",initialValue = 1,allocationSize = 1)
    @Column(name="id")
    private Long id;

    @Column(name = "laptop_number")
    private String laptop_name ;

    @Column(name = "monitor_number")
    private String monitorNumber;

    @Column(name = "lan_id_number")
    private String lanIdNumber;

    @Column(name = "keyboard_number")
    private String keyboardNumber;

    @Column(name = "laptop_charger_number")
    private String laptopChargerNumber;

    @Column(name = "mouseStatus")
    private boolean mouseStatus;

    @Column(name = "ear_phone_status")
    private boolean earPhoneStatus;

    @Column(name = "laptop_bag")
    private boolean laptopBag;

    @Column(name = "locker_code")
    private String lockerCode;

}
