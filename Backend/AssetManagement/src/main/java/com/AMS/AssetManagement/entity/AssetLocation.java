package com.AMS.AssetManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "asset_location")
public class AssetLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id",unique = true)
    private Long id;

    @Column(name = "place_id",unique = true)
    private String placeId;
}
