from fpdf import FPDF
import natsort
import os
import sys

latstr = "GPS Latitude"
filenamestr = "File Name"
filesourcestr = "File Source"
fmstr = "File Modification Date/Time"
mdstr = "Modify Date"
lensmakestr = "Lens Make"
lensmodelstr = "Lens Model"
dtstr = "Date/Time Original"
cdstr = "Create Date"
gpsposstr = "GPS Position"
cannonstr = "Canon Model ID"
swstr = "Software"
cmstr = "Camera Model Name"
mkstr = "Make"

#set date time flag
dtflag = False
#get dirpath
#dirpath = input("Enter directory path: ")

#save pdf name
#pdfname = dirpath

#get directory contents
SCRIPT_NAME = os.path.basename(__file__)
path = os.getcwd()
print('Number of arguments:', len(sys.argv), 'arguments.')
print('Argument List:', str(sys.argv))
tag_arr = sys.argv[1:]
parsed_tag_arr = []
for tag in tag_arr:
    parsed_tag_arr.append(tag.replace("_"," ").split(','))
print('parsed tags',parsed_tag_arr)
checkfilenames = os.listdir(".")
for filename in checkfilenames:
    os.rename(os.path.join(path, filename), os.path.join(path, filename.replace(' ', '_')))
dircontent = os.listdir(".")

#createpdf
pdf = FPDF()

#add page
pdf.add_page()

#set font
pdf.set_font("Arial", size = 9)

#int entryindex
entryindex = 1

#int height
height_x = 10
height_y = 10

#strip spaces in filenames
#conver dates to standard format

#order filenames
orderedEntries = []
sortedKeysList = natsort.natsorted(dircontent)
print('sorted: ',sortedKeysList)



#grab metadata from each entry
for entry in sortedKeysList:
    if entry == SCRIPT_NAME:
        continue
    print("e ",entry)
    cmd = 'exiftool '+ entry
    output_stream = os.popen(cmd)
    data = output_stream.read()

    #convert data to array
    print("filename: ", entry)



    #add filename to pdf
    #pdf.cell(200, 10, entry, ln = entryindex, align = 'L')


    #inc entryindex
    #entryindex = entryindex + 1

    #add img to pdf

    #check if page is full
    if(height_x >= 205.5):
        pdf.add_page()
        height_x = 10
        height_y = height_x

    pdf.image(entry, x = None, y = height_x, w=90, h=90)

    height_y = height_y + 2.5
  
    for attr in data.split('\n'): 
        attr = attr.split(":",1)
        print('attr ',attr)
        for a in attr:
            if attrLabel:
                pdf.text(105,height_y, attr[0].strip())
                attrLabel = False
            else:
                attrdesc = ':' + attr[1]
                pdf.text(145,height_y, attrdesc)
                attrLabel = True
            height_y = height_y + 4.5
        if(height_y >= 296):
            pdf.add_page()
            height_y = 12.5

      
        if(latstr in attr and 'North' not in attr):
            print('has gps data ',attr)
            gpslat = attr.replace('deg','').replace('N','').replace("'",'').replace('"','')
            gpslat = list(gpslat.split(" "))
        
            gpslat.pop(0)
            gpslat.pop(0)
            while("" in gpslat):
                gpslat.remove("")
            print('gpslat ',gpslat)


    height_x = height_x + 95
    height_y = height_x
    print('height left',height_x)
    print('height right',height_y)

#save pdf with name
print("cwd:",os.getcwd().split("/")[-1])
current_dir = os.getcwd().split("/")[-1]
pdfstr = current_dir + '.pdf'
pdf.output(pdfstr)
