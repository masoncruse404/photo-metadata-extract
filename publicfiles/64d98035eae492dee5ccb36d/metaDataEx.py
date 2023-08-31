from fpdf import FPDF
import natsort
import os
import sys

def renameFiles(files):
    for filename in files:
        os.rename(os.path.join(path, filename), os.path.join(path, filename.replace(' ', '_')))
    return
#set date time flag
dtflag = False
dtstr = "Date/Time Original"


#get directory contents
SCRIPT_NAME = os.path.basename(__file__)
path = os.getcwd()
tag_arr = sys.argv[1:]
parsed_tag_arr = []
for tag in tag_arr:
    parsed_tag_arr.append(tag.replace("_"," ").split(','))
print('parsed tags',parsed_tag_arr)
dir_content = os.listdir(".")
renameFiles(dir_content)

renamed_dir_content = os.listdir(".")

#createpdf
pdf = FPDF()

#add page
pdf.add_page()

#set font
pdf.set_font("Arial", size = 8)

#initialize entry_index
entry_index = 1

#initialize height
pdf_x = 10
pdf_y = 10

#order filenames
orderedEntries = []
sorted_dir_content = natsort.natsorted(renamed_dir_content)

#grab metadata from each entry
for entry in sorted_dir_content:
    if entry == SCRIPT_NAME:
        continue
    
    cmd = 'exiftool '+ entry
    output_stream = os.popen(cmd)
    data = output_stream.read()

    #check for overflow
    if(pdf_x >= 205.5):
        pdf.add_page()
        pdf_x = 10
        pdf_y = pdf_x

    pdf.image(entry, x = None, y = pdf_x, w=90, h=90)
    pdf_y = pdf_y + 1.5

    for tag in parsed_tag_arr[0]:
        #flag if selected meta tag is not found in metadata
        has_attr = False
        for attr in data.split('\n'): 
            print('tag | attr',tag, attr)  
            if str(tag).rstrip() in str(attr).rstrip():
                #selected tag found in pictures metadata
                has_attr = True
                
                if(dtstr in attr and dtflag):
                    #some files have multiple date/time attr so only write once
                    continue

                if(dtstr in attr):
                    #date/time found set flag
                    dtflag = True

                #style for 2 column PDF text
                attrLabel = True
                attr = attr.split(":",1)
                print('attr ',attr)
                for a in attr:
                    if attrLabel:
                        pdf.text(105,pdf_y, attr[0].rstrip().replace("  *"," "))
                        attrLabel = False
                    else:
                        attrdesc = ':' + attr[1]
                        pdf.text(145,pdf_y, attrdesc.rstrip())
                        attrLabel = True
                pdf_y = pdf_y + 4.5
        #meta data was not found 
        if(not has_attr):
            pdf.text(105, pdf_y, tag)
            pdf.text(145, pdf_y, ': not available')
            pdf_y = pdf_y + 4.5

        if(pdf_y >= 296):
            pdf.add_page()
            pdf_y = 12.5


    pdf_x = pdf_x + 95
    pdf_y = pdf_x
    print('height left',pdf_x)
    print('height right',pdf_y)

#save pdf with name
print("cwd:",os.getcwd().split("/")[-1])
current_dir = os.getcwd().split("/")[-1]
pdfstr = current_dir + '.pdf'
pdf.output(pdfstr)
