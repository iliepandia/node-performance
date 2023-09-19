#include <iostream>
#include <cstdlib>
#include <ctime>
#include <fstream>
#include <chrono>
#include <string.h>

auto starTime = std::chrono::high_resolution_clock::now();

void showTimeLog( std::chrono::high_resolution_clock::time_point startTime ){
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end - startTime).count();
    std::cout << "processing "<< ": " << duration << "ms" << std::endl;
}

int main()
{
    const char* words[] = {
        "apple",
		"car",
		"skoda",
		"food",
		"cherry",
		"love",
		"unknown",
		"feature",
		"charachter",
		"mouse",
		"kids",
		"table",
		"chair",
		"veggies",
		"the",
		"cup",
		"plate",
		"UFO",
		"rapture"
    };

    const int lengthOflist = sizeof( words ) / sizeof( words[0] );

    const int maxWords = 50;
    const int maxLines = 10000000;
    //const int maxLines = 200000;

    std::srand(std::time(nullptr));

    std::cout  << "Building the Large file using C++" << std::endl;

    int wordCount = 40 + std::rand() % (maxWords-40);

    //estimate the maxinum memory I will need in this buffer
    //...careful! If I have words that are longer I will shot myself in the foot!
    char* buffer = (char*) malloc( lengthOflist * 30 );

    const char* fileName = "./big.txt";

    std::ofstream file( fileName );
    

    if( file ){
        for(int j=0; j<maxLines; j++ ){

            //This code will generate a sentence
            buffer[0] = '\0';
            for(int i = 0; i < wordCount; i++ ){
                strcat( buffer, words[ std::rand() % lengthOflist ]);
                strcat( buffer, (i < wordCount - 1 ? " " : "." ) );
            }

            strcat( buffer, "\n" );

            file << buffer;

            if( j % 10000 == 0 ){
                std::cout << "Wrote " << j << " lines" << std::endl;
            }

            if( j % 100000 == 0 ){
                showTimeLog(starTime);
            }
        }
        
        std::cout << "Wrote " << maxLines << " lines" << std::endl;

        file.close();
        showTimeLog(starTime);
    }else{
        std::cerr << "Could not open the file for writing. Hm" << std::endl;
    }

    free(buffer);

}