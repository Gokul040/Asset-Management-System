package com.AMS.AssetManagement.repository;

import com.AMS.AssetManagement.entity.AssetLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetLocationRepo extends JpaRepository<AssetLocation,Long> {

    Optional<AssetLocation> findByPlaceId(String placeId);
    Optional<AssetLocation> existsByPlaceId(String placeId);

}
