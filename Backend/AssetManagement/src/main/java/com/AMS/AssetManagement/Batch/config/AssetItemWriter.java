package com.AMS.AssetManagement.Batch.config;

import com.AMS.AssetManagement.entity.AssetLocation;
import com.AMS.AssetManagement.repository.AssetLocationRepo;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class AssetItemWriter implements ItemWriter<AssetLocation> {

    @Autowired
    private AssetLocationRepo repository;

    public AssetItemWriter(AssetLocationRepo repository) {
        this.repository = repository;
    }

    @Override
    public void write(@NonNull Chunk<? extends AssetLocation> chunk) throws Exception {
       System.out.println("Writer Thread "+Thread.currentThread().getName());
       repository.saveAll(chunk);

    }

//    @Override
//    public void write(List<? extends Customer> list) throws Exception {
//        System.out.println("Writer Thread "+Thread.currentThread().getName());
//        repository.saveAll(list);
//    }

    // @Override
    // public void write(Chunk<? extends AssetLocation> chunk) throws Exception {
    //     System.out.println("Writer Thread "+Thread.currentThread().getName());
    //     repository.saveAll(chunk);
    // }
}
